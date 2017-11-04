package laboratorioC.webappMP.dto;

import javax.xml.bind.annotation.XmlRootElement;

import laboratorioC.model.LatLng;

@XmlRootElement
public class LatLngDTO {
	private float lat;
	private float lng;
	
	public LatLngDTO() {}
	
	public LatLngDTO(final LatLng latLng) {
		this.lat = latLng.getLatitude();
		this.lng = latLng.getLongitude();
	}

	public float getLat() {
		return lat;
	}

	public void setLat(float lat) {
		this.lat = lat;
	}

	public float getLng() {
		return lng;
	}

	public void setLng(float lng) {
		this.lng = lng;
	}
}
