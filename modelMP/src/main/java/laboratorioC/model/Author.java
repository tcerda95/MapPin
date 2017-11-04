package laboratorioC.model;

public class Author {
	private int id;
	private String name;
	private String email;
	
	public Author(final int id, final String name, final String email) {
		this.id = id;
		this.name = name;
		this.email = email;
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
	
	@Override
	public boolean equals(Object obj) {
		if (obj == this)
			return true;
		
		if (!(obj instanceof Author))
			return false;
		
		final Author other = (Author) obj;
		
		return getId() == other.getId() || getEmail() == other.getEmail();
	}
	
	@Override
	public int hashCode() {
		return id;
	}
}
