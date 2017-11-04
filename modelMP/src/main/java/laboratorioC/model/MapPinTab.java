package laboratorioC.model;

import java.util.List;

public class MapPinTab {
	private final int id;
	private final String name;
	private final List<MapPin> pins;
	
	public MapPinTab(final int id, final String name, final List<MapPin> pins) {
		this.id = id;
		this.name = name;
		this.pins = pins;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<MapPin> getPins() {
		return pins;
	}
	
	@Override
	public int hashCode() {
		return id;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj == this)
			return true;
		if (!(obj instanceof MapPinTab))
			return false;
		
		MapPinTab other = (MapPinTab) obj;
		
		return other.getId() == other.getId();
	}
}