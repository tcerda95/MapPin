package laboratorioC.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import laboratorioC.model.MapPinTab;
import laboratorioC.persistence.MapPinTabDao;

@Service
public class MapPinTabServiceImpl implements MapPinTabDao {

	@Autowired
	private MapPinTabDao mapPinTabDao;
	
	@Override
	public MapPinTab createMapPinTab(String name, int mapId) {
		return mapPinTabDao.createMapPinTab(name, mapId);
	}

}
