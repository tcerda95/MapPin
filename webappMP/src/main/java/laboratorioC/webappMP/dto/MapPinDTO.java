package laboratorioC.webappMP.dto;

import javax.xml.bind.annotation.XmlRootElement;

import laboratorioC.model.MapPin;

@XmlRootElement
public class MapPinDTO {

	public String name;
	
	public MapPinDTO() {}
	
	public MapPinDTO(final MapPin map) {
		this.name = map.getName();
	}
}
