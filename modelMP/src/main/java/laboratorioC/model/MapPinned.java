package laboratorioC.model;

import java.util.List;

public class MapPinned {
	private int id;
	private final String name;
	private final String description;
	private final Author author;
	private final LatLng initial;
	private final int zoom;
	private List<MapPinTab> tabs;
	
	public MapPinned(final int id, final String name, final String description, final Author author, final LatLng initial, int zoom) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.author = author;
		this.initial = initial;
		this.zoom = zoom;
	}

	public MapPinned(final int id, final String name, final String description, final Author author, final LatLng initial, int zoom, final List<MapPinTab> tabs) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.author = author;
		this.tabs = tabs;
		this.initial = initial;
		this.zoom = zoom;
	}
	
	public int getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}

	public Author getAuthor() {
		return author;
	}

	public String getDescription() {
		return description;
	}
	
	public List<MapPinTab> getTabs() {
		return tabs;
	}
	
	public void setTabs(List<MapPinTab> tabs) {
		this.tabs = tabs;
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

	public int getZoom() {
		return zoom;
	}

	public LatLng getInitial() {
		return initial;
	}
}
