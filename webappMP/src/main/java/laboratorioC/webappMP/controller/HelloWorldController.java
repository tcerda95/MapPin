package laboratorioC.webappMP.controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import laboratorioC.model.MapPinned;
import laboratorioC.service.MapPinnedService;
import laboratorioC.webappMP.dto.MapPinDTO;

@Path("map")
@Controller
@Produces(value = {MediaType.APPLICATION_JSON})
public class HelloWorldController {
	
	@Autowired
	private MapPinnedService mapPinnedService;
	
	@GET
	@Path("/")
	public Response getProductById() {		
		final MapPinned map = new MapPinned("Gran mapa");
		
		return Response.ok(new MapPinDTO(map)).build();
	}
}
