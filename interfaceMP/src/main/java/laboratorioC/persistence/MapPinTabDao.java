package laboratorioC.persistence;

import laboratorioC.model.MapPinTab;

public interface MapPinTabDao {
	MapPinTab createMapPinTab(final String name, final int mapId);
}
