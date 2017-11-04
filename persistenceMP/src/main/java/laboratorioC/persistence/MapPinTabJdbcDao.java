package laboratorioC.persistence;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import laboratorioC.model.MapPinTab;

@Repository
public class MapPinTabJdbcDao implements MapPinTabDao {
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcInsert jdbcInsert;

    public static final RowMapper<MapPinTab> tabMapper = new RowMapper<MapPinTab>() {
		@Override
		public MapPinTab mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new MapPinTab(rs.getInt("tabid"), rs.getString("tabname"));
		}
    };
    
    @Autowired
    public MapPinTabJdbcDao(DataSource ds) {
        jdbcTemplate = new JdbcTemplate(ds);
        
        jdbcInsert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("tabs")
                .usingGeneratedKeyColumns("tabid");
	}
	
	@Override
	public MapPinTab createMapPinTab(String name, int mapId) {
		final Map<String, Object> args = new HashMap<>();
		
		args.put("tabname", name);
		args.put("mapid", mapId);
		
		final Number id = jdbcInsert.executeAndReturnKey(args);
		
		return new MapPinTab(id.intValue(), name);
	}

}
