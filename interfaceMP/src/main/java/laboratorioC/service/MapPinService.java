package laboratorioC.service;

import laboratorioC.model.MapPin;
import laboratorioC.model.PinCategory;

public interface MapPinService {
	MapPin createMapPin(String name, String description, PinCategory pinCategory, float latitude, float longitude, int mapPinTabId);
}
