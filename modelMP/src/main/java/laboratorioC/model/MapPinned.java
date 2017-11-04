package laboratorioC.model;

import java.util.List;

public class MapPinned {
	private final int id;
	private final String name;
	private final Author author;
	private final List<MapPinTab> tabs;
	
	public MapPinned(final int id, final String name, final Author author, final List<MapPinTab> tabs) {
		this.id = id;
		this.name = name;
		this.author = author;
		this.tabs = tabs;
	}
	
	public int getId() {
		return id;
	}
	
	@Override
	public int hashCode() {
		return id;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		
		if (!(obj instanceof MapPinned))
			return false;
		
		final MapPinned other = (MapPinned) obj;

		return other.getId() == getId();
	}

	public String getName() {
		return name;
	}

	public Author getAuthor() {
		return author;
	}

	public List<MapPinTab> getTabs() {
		return tabs;
	}
}
