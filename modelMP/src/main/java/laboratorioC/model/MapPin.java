package laboratorioC.model;

public class MapPin {
	private int id;
	private final String name;
	private final String description;
	private final PinCategory category;
	private final String imageUrl;
	private final LatLng latLng;

	public MapPin(final String name, final String description, final PinCategory category, final String imageUrl, final float latitude, final float longitude) {
		this.name = name;
		this.description = description;
		this.category = category;
		this.imageUrl = imageUrl;
		this.latLng = new LatLng(latitude, longitude);
	}
	
	public MapPin(final int id, final String name, final String description, final PinCategory category, final String imageUrl, final float latitude, final float longitude) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.category = category;
		this.imageUrl = imageUrl;
		this.latLng = new LatLng(latitude, longitude);
	}
		
	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public PinCategory getCategory() {
		return category;
	}
	
	public String getImageUrl() {
		return imageUrl;
	}
	
	public LatLng getLatLng() {
		return latLng;
	}
	
	@Override
	public int hashCode() {
		return id;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj == this)
			return true;
		
		if (!(obj instanceof MapPin))
			return false;
		
		MapPin pin = (MapPin) obj;
		
		return pin.getId() == getId();
	}
}
