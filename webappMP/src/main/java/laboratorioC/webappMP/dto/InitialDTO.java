package laboratorioC.webappMP.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class InitialDTO {
	private LatLngDTO latLng;
	private int zoom;
	
	public InitialDTO() {}
	
	public InitialDTO(LatLngDTO latLng, int zoom) {
		this.latLng = latLng;
		this.zoom = zoom;
	}

	public LatLngDTO getLatLng() {
		return latLng;
	}

	public void setLatLng(LatLngDTO latLng) {
		this.latLng = latLng;
	}

	public int getZoom() {
		return zoom;
	}

	public void setZoom(int zoom) {
		this.zoom = zoom;
	}
}
