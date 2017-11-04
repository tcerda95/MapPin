package laboratorioC.persistence;

import laboratorioC.model.MapPinned;

public interface MapPinnedDao {
	MapPinned getMapById(int id);
	MapPinned createMap(String name, String description, int authorId);
}
