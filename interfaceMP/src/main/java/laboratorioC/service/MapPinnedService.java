package laboratorioC.service;

import laboratorioC.model.MapPinned;

public interface MapPinnedService {
	MapPinned getMapById(int id);
	MapPinned createMap(String name, String description, int authorId);
}
