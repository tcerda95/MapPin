package laboratorioC.persistence;

import laboratorioC.model.MapPin;
import laboratorioC.model.PinCategory;

public interface MapPinDao {
	MapPin createMapPin(String name, String description, PinCategory pinCategory, float latitude, float longitude, int mapPinTabId);
}
