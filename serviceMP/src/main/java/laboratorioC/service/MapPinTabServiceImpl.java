package laboratorioC.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import laboratorioC.model.MapPinTab;
import laboratorioC.persistence.MapPinTabDao;

@Component
public class MapPinTabServiceImpl implements MapPinTabService {

	@Autowired
	private MapPinTabDao mapPinTabDao;
	
	@Override
	public MapPinTab createMapPinTab(String name, int mapId) {
		return mapPinTabDao.createMapPinTab(name, mapId);
	}

}
