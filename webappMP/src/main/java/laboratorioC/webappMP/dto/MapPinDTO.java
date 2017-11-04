package laboratorioC.webappMP.dto;

import javax.xml.bind.annotation.XmlRootElement;

import laboratorioC.model.MapPin;

@XmlRootElement
public class MapPinDTO {
	private int id;
	private String name;
	private String description;
	private String type;
	private String img_url;
	private LatLngDTO latLng;
	
	public MapPinDTO() {}
	
	public MapPinDTO(final MapPin pin) {
		this.id = pin.getId();
		this.name = pin.getName();
		this.description = pin.getDescription();
		this.type = pin.getCategory().toString();
		this.img_url = pin.getImageUrl();
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LatLngDTO getLatLng() {
		return latLng;
	}

	public void setLatLng(LatLngDTO latLng) {
		this.latLng = latLng;
	}

	public String getImg_url() {
		return img_url;
	}

	public void setImg_url(String img_url) {
		this.img_url = img_url;
	}
}
