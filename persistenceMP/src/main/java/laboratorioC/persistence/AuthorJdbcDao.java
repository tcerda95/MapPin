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

@Repository
public class AuthorJdbcDao implements AuthorDao {
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcInsert jdbcInsert;
    
    public static final RowMapper<Author> authorMapper = new RowMapper<Author>() {

		@Override
		public Author mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new Author(rs.getInt("authorid"), rs.getString("authorname"), rs.getString("email"));
		}
    	
    };
    
    @Autowired
    public AuthorJdbcDao(final DataSource ds) {
        jdbcTemplate = new JdbcTemplate(ds);
        
        jdbcInsert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("authors")
                .usingGeneratedKeyColumns("authorid");        
    }
	
	@Override
	public Author createAuthor(String name, String email) {
		final Map<String, Object> args = new HashMap<>();
		
		args.put("authorname", name);
		args.put("email", email);
		
		final Number id = jdbcInsert.executeAndReturnKey(args);
		
		return new Author(id.intValue(), name, email);
	}

	@Override
	public Author getAuthorById(int id) {
		@SuppressWarnings("boxing")
		final List<Author> authorList = jdbcTemplate.query("SELECT * FROM authors WHERE authorid = ?", authorMapper, id);
		
		if (authorList.isEmpty())
			return null;
		
		return authorList.get(0);
	}
	
	@Override
	public Author getAuthorByEmail(String email) {
		final List<Author> authorList = jdbcTemplate.query("SELECT * FROM authors WHERE email = ?", authorMapper, email);
		
		if (authorList.isEmpty())
			return null;
		
		return authorList.get(0);
	}

}
