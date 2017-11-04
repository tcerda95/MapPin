package laboratorioC.persistence;

import laboratorioC.model.Author;

public interface AuthorDao {
	Author createAuthor(String name, String email);
	Author getAuthorById(int id);
	Author getAuthorByEmail(String email);
}
