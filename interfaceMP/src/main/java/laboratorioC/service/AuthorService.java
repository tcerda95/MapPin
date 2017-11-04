package laboratorioC.service;

import laboratorioC.model.Author;

public interface AuthorService {
	Author createAuthor(String name, String email);
	Author getAuthorById(int id);
	Author getAuthorByEmail(String email);
}
