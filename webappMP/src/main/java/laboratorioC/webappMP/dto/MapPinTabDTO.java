package laboratorioC.webappMP.dto;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import laboratorioC.model.MapPin;
import laboratorioC.model.MapPinTab;

@XmlRootElement
public class MapPinTabDTO {
	private int id;
	private String name;
	private List<MapPinDTO> pins;

	public MapPinTabDTO() {}
	
	public MapPinTabDTO(final MapPinTab tab) {
		this.id = tab.getId();
		this.name = tab.getName();
		this.pins = mapPinDtos(tab.getPins());
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

	public List<MapPinDTO> getPins() {
		return pins;
	}

	public void setPins(List<MapPinDTO> pins) {
		this.pins = pins;
	}

	private List<MapPinDTO> mapPinDtos(List<MapPin> pins) {
		final List<MapPinDTO> mapPinDtos = new ArrayList<>(pins.size());
		
		for (MapPin pin : pins)
			mapPinDtos.add(new MapPinDTO(pin));
		
		return mapPinDtos;
	}

}