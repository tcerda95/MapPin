package laboratorioC.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import laboratorioC.model.Author;
import laboratorioC.persistence.AuthorDao;

@Service
public class AuthorServiceImpl implements AuthorService {

	@Autowired
	private AuthorDao authorDao;
	
	@Override
	public Author createAuthor(String name, String email) {
		return authorDao.createAuthor(name, email);
	}

	@Override
	public Author getAuthorById(int id) {
		return authorDao.getAuthorById(id);
	}

	@Override
	public Author getAuthorByEmail(String email) {
		return authorDao.getAuthorByEmail(email);
	}

}
