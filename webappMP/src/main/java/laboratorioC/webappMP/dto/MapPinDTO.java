package laboratorioC.webappMP.dto;

import javax.xml.bind.annotation.XmlRootElement;

import laboratorioC.model.MapPin;

@XmlRootElement
public class MapPinDTO {
	private int id;
	private String name;
	private String description;
	private String category;
	private String imageUrl;
	private LatLngDTO latLng;
	
	public MapPinDTO() {}
	
	public MapPinDTO(final MapPin pin) {
		this.id = pin.getId();
		this.name = pin.getName();
		this.description = pin.getDescription();
		this.category = pin.getCategory().toString();
		this.imageUrl = pin.getImageUrl();
		this.latLng = new LatLngDTO(pin.getLatLng());
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public LatLngDTO getLatLng() {
		return latLng;
	}

	public void setLatLng(LatLngDTO latLng) {
		this.latLng = latLng;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
}
