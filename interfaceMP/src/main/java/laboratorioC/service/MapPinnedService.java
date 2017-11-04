package laboratorioC.service;

import java.util.List;

import laboratorioC.model.MapPinned;

public interface MapPinnedService {
	MapPinned getMapById(int id);
	MapPinned createMap(String name, String description, int authorId, float initLatitude, float initLongitude, int zoom);
	MapPinned replaceMap(int origin, int newMap);
	List<MapPinned> getMaps();
	List<MapPinned> getMapsByName(String name);
}
