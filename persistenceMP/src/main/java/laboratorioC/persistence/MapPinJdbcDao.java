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

import laboratorioC.model.MapPin;
import laboratorioC.model.PinCategory;

@Repository
public class MapPinJdbcDao implements MapPinDao {
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcInsert jdbcInsert;

    public static final RowMapper<MapPin> pinMapper = new RowMapper<MapPin> () {
		@Override
		public MapPin mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new MapPin(rs.getInt("pinid"), rs.getString("pinname"), rs.getString("pindescription"), PinCategory.valueOf(rs.getString("category")), 
					rs.getString("imageurl"), rs.getFloat("latitude"), rs.getFloat("longitude"));
		}
    };
    
    @Autowired
    public MapPinJdbcDao(DataSource ds) {
        jdbcTemplate = new JdbcTemplate(ds);
        
        jdbcInsert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("pins")
                .usingGeneratedKeyColumns("pinid");    	
	}
    
	@Override
	public MapPin createMapPin(String name, String description, PinCategory pinCategory, String imageUrl, float latitude, float longitude, int mapPinTabId) {
		final Map<String, Object> args = new HashMap<>();
		
		args.put("pinname", name);
		args.put("pindescription", description);
		args.put("category", pinCategory.name());
		args.put("imageurl", imageUrl);
		args.put("latitude", latitude);
		args.put("longitude", longitude);
		args.put("tabid", mapPinTabId);
		
		Number id = jdbcInsert.executeAndReturnKey(args);
		
		return new MapPin(id.intValue(), name, description, pinCategory, imageUrl, latitude, longitude);
	}

}
