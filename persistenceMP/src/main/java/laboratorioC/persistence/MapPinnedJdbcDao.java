package laboratorioC.persistence;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import laboratorioC.model.Author;
import laboratorioC.model.LatLng;
import laboratorioC.model.MapPin;
import laboratorioC.model.MapPinTab;
import laboratorioC.model.MapPinned;

@Repository
public class MapPinnedJdbcDao implements MapPinnedDao {
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcInsert jdbcInsert;
    
    @Autowired
    private AuthorDao authorDao;
    
    private static final RowMapper<MapPinned> mapMapper = new RowMapper<MapPinned>() {
		@Override
		public MapPinned mapRow(ResultSet rs, int rowNum) throws SQLException {
			final Author author = AuthorJdbcDao.authorMapper.mapRow(rs, rowNum);
			
			return new MapPinned(rs.getInt("mapid"), rs.getString("mapname"), rs.getString("mapdescription"), author,
					new LatLng(rs.getFloat("initlatitude"), rs.getFloat("initlongitude")), rs.getInt("initzoom"));
		}
    };
    
    @Autowired
    public MapPinnedJdbcDao(DataSource ds) {
        jdbcTemplate = new JdbcTemplate(ds);
        
        jdbcInsert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("maps")
                .usingGeneratedKeyColumns("mapid");
	}
    
	@Override
	public MapPinned getMapById(int id) {
		final List<MapPinTab> tabs = getMapPinTabs(id);
		
		if (tabs.isEmpty())
			return null;
		
		final List<MapPinned> maps = jdbcTemplate.query("SELECT * FROM maps NATURAL JOIN authors WHERE mapid = ?", mapMapper, id);
		final MapPinned map = maps.get(0);
		
		map.setTabs(tabs);
		
		return map;
	}

	private List<MapPinTab> getMapPinTabs(int id) {
		final List<MapPinTab> mapPinTabs = jdbcTemplate.query("SELECT tabid, tabname FROM tabs NATURAL JOIN maps WHERE mapid = ?", MapPinTabJdbcDao.tabMapper, id);
		
		for (MapPinTab tab : mapPinTabs)
			tab.setPins(getPinsFromTabId(tab.getId()));
		
		return mapPinTabs;
	}

    private List<MapPin> getPinsFromTabId(int tabId) {
		return jdbcTemplate.query("SELECT pinid, pinname, pindescription, category, latitude, longitude FROM pins NATURAL JOIN tabs WHERE tabid = ?", MapPinJdbcDao.pinMapper, tabId);
	}
	
	@Override
	public MapPinned createMap(String name, String description, int authorId, float initLatitude, float initLongitude, int zoom) {
		final Map<String, Object> args = new HashMap<>();
		
		args.put("authorname", name);
		args.put("description", description);
		args.put("authorid", authorId);
		args.put("initlatitude", initLatitude);
		args.put("initLongitude", initLongitude);
		args.put("initzoom", zoom);
		
		final Number id = jdbcInsert.executeAndReturnKey(args);
		
		return new MapPinned(id.intValue(), name, description, authorDao.getAuthorById(authorId), new LatLng(initLatitude, initLongitude), zoom);
	}

}
