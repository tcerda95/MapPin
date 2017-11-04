package laboratorioC.persistence;

import java.util.List;

import laboratorioC.model.MapPinned;

public interface MapPinnedDao {
	MapPinned getMapById(int id);
	MapPinned createMap(String name, String description, int authorId, float initLatitude, float initLongitude, int zoom);
	List<MapPinned> getMaps();
	MapPinned replaceMaps(int origin, int newMap);
	List<MapPinned> getMapsByName(String name);
}
