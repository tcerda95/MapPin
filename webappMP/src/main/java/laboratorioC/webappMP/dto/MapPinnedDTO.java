package laboratorioC.webappMP.dto;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import laboratorioC.model.MapPinTab;
import laboratorioC.model.MapPinned;

@XmlRootElement
public class MapPinnedDTO {
	private int id;
	private String name;
	private String description;
	private AuthorDTO author;
	private List<MapPinTabDTO> tabs;

	public MapPinnedDTO() {}
	
	public MapPinnedDTO(final MapPinned mapPinned) {
		this.id = mapPinned.getId();
		this.name = mapPinned.getName();
		this.description = mapPinned.getDescription();
		this.author = new AuthorDTO(mapPinned.getAuthor());
		this.tabs = mapPinTabs(mapPinned.getTabs());
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

	public AuthorDTO getAuthor() {
		return author;
	}

	public void setAuthor(AuthorDTO author) {
		this.author = author;
	}

	public List<MapPinTabDTO> getTabs() {
		return tabs;
	}

	public void setTabs(List<MapPinTabDTO> tabs) {
		this.tabs = tabs;
	}

	private List<MapPinTabDTO> mapPinTabs(List<MapPinTab> tabs) {
		final List<MapPinTabDTO> list = new ArrayList<>(tabs.size());
		
		for (MapPinTab tab : tabs)
			list.add(new MapPinTabDTO(tab));
		
		return list;
	}
}
