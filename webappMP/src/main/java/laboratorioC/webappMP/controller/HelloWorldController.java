package laboratorioC.webappMP.controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Controller;

import laboratorioC.model.MapPin;
import laboratorioC.webappMP.dto.MapPinDTO;

@Path("map")
@Controller
@Produces(value = {MediaType.APPLICATION_JSON})
public class HelloWorldController {
	
	@GET
	@Path("/")
	public Response getProductById() {		
		final MapPin map = new MapPin("Gran mapa");
		
		return Response.ok(new MapPinDTO(map)).build();
	}
}
