package laboratorioC.service;

import laboratorioC.model.MapPin;
import laboratorioC.model.PinCategory;

public interface MapPinService {
	MapPin createMapPin(String name, String description, PinCategory pinCategory, String imageUrl, float latitude, float longitude, int mapPinTabId);
}
