package laboratorioC.service;

import laboratorioC.model.MapPin;
import laboratorioC.model.PinCategory;

public interface MapPinService {
	MapPin createMapPin(String name, String description, PinCategory pinCategory, int mapPinTabId, float latitude, float longitude);
}
