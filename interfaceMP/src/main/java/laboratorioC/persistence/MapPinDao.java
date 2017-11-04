package laboratorioC.persistence;

import laboratorioC.model.MapPin;
import laboratorioC.model.PinCategory;

public interface MapPinDao {
	MapPin createMapPin(String name, String description, PinCategory pinCategory, String imageUrl, float latitude, float longitude, int mapPinTabId);
}
