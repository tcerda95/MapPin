package laboratorioC.webappMP.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import laboratorioC.model.Author;
import laboratorioC.model.MapPin;
import laboratorioC.model.MapPinTab;
import laboratorioC.model.MapPinned;
import laboratorioC.model.PinCategory;
import laboratorioC.service.AuthorService;
import laboratorioC.service.MapPinService;
import laboratorioC.service.MapPinTabService;
import laboratorioC.service.MapPinnedService;
import laboratorioC.webappMP.dto.MapListDTO;
import laboratorioC.webappMP.dto.MapPinDTO;
import laboratorioC.webappMP.dto.MapPinTabDTO;
import laboratorioC.webappMP.dto.MapPinnedDTO;

@Path("map")
@Controller
@Produces(value = {MediaType.APPLICATION_JSON})
public class MapPinController {
	
	@Autowired
	private MapPinnedService mapPinnedService;
	
	@Autowired
	private AuthorService authorService;
	
	@Autowired
	private MapPinTabService mapPinTabService;
	
	@Autowired
	private MapPinService mapPinService;
	
	@Context
	private UriInfo uriInfo;
	
	@GET
	@Path("/search")
	public Response getMyByName(@QueryParam("name") final String name) {
		final List<MapPinned> map = mapPinnedService.getMapsByName(name);
		return Response.ok(new MapListDTO(map)).build();
	}
	
	@GET
	@Path("/{id}")
	public Response getMapById(@PathParam("id") final int id) {		
		final MapPinned map = mapPinnedService.getMapById(id);
		
		if (map == null)
			return Response.status(Status.NOT_FOUND).build();
		
		return Response.ok(new MapPinnedDTO(map)).build();
	}
	
	@GET
	@Path("/")
	public Response getMaps() {
		final List<MapPinned> maps = mapPinnedService.getMaps();
		return Response.ok(new MapListDTO(maps)).build();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response createMap(final MapPinnedDTO mapDto) {
		if (mapDto == null) {
			Response.status(Status.BAD_REQUEST);
			System.out.println("MAP DTO ES NULL");
		}
		
		Author author = authorService.getAuthorByEmail(mapDto.getAuthor().getEmail());

		if (author == null)
			author = authorService.createAuthor(mapDto.getAuthor().getName(), mapDto.getAuthor().getEmail());

		MapPinned map = mapPinnedService.createMap(mapDto.getName(), mapDto.getDescription(), author.getId(), 
				mapDto.getInitial().getLatLng().getLat(), mapDto.getInitial().getLatLng().getLng(), mapDto.getInitial().getZoom());

		if (mapDto.getTabs() == null)
			map.setTabs(new ArrayList<>());
		else
			map.setTabs(insertMapPinTabs(mapDto.getTabs(), map.getId()));
		
		if (mapDto.hasId() && mapPinnedService.getMapById(mapDto.getId()) != null)
			map = mapPinnedService.replaceMap(mapDto.getId(), map.getId());
		
		final URI location = uriInfo.getAbsolutePathBuilder().path(String.valueOf(map.getId())).build();
		return Response.created(location).entity(new MapPinnedDTO(map)).build();
	}
	
	private List<MapPinTab> insertMapPinTabs(List<MapPinTabDTO> tabsDto, int mapId) {
		final List<MapPinTab> tabs = new ArrayList<>(tabsDto.size());
		
		for (MapPinTabDTO tabDto : tabsDto) {
			final MapPinTab tab = mapPinTabService.createMapPinTab(tabDto.getName(), mapId);
			tab.setPins(insertTabPins(tabDto.getPins(), tab.getId()));
			tabs.add(tab);
		}
		
		return tabs;
	}

	private List<MapPin> insertTabPins(List<MapPinDTO> pinsDto, int tabId) {
		List<MapPin> pins = new ArrayList<>(pinsDto.size());
		
		for (MapPinDTO pinDto : pinsDto)
			pins.add(mapPinService.createMapPin(pinDto.getName(), pinDto.getDescription(), 
					PinCategory.valueOf(pinDto.getType().toUpperCase()), pinDto.getImg_url(), 
					pinDto.getLatLng().getLat(), pinDto.getLatLng().getLng(), tabId));
		
		return pins;
	}	
}
