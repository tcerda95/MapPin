package laboratorioC.webappMP.dto;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import laboratorioC.model.MapPinned;

@XmlRootElement
public class MapListDTO {

	private List<MapPinnedDTO> maps;
	
	public MapListDTO(){}
	
	public MapListDTO(List<MapPinned> maps) {
		this.maps = new ArrayList<>(maps.size());
		
		for (MapPinned map : maps)
			this.maps.add(new MapPinnedDTO(map));
	}

	public List<MapPinnedDTO> getMaps() {
		return maps;
	}

	public void setMaps(List<MapPinnedDTO> maps) {
		this.maps = maps;
	}
}
