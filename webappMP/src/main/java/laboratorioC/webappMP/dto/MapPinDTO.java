package laboratorioC.webappMP.dto;

import javax.xml.bind.annotation.XmlRootElement;

import laboratorioC.model.MapPinned;

@XmlRootElement
public class MapPinDTO {

	public String name;
	
	public MapPinDTO() {}
	
	public MapPinDTO(final MapPinned map) {
		this.name = map.getName();
	}
}
