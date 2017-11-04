package laboratorioC.webappMP.dto;

import javax.xml.bind.annotation.XmlRootElement;

import laboratorioC.model.Author;

@XmlRootElement
public class AuthorDTO {
	private int id;
	private String name;
	private String email;

	public AuthorDTO() {}
	
	public AuthorDTO(final Author author) {
		this.id = author.getId();
		this.name = author.getName();
		this.email = author.getEmail();
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}
	
	public void setId(int id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
