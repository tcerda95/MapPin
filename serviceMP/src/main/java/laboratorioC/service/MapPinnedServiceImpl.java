package laboratorioC.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import laboratorioC.model.MapPinned;
import laboratorioC.persistence.MapPinnedDao;

@Component
public class MapPinnedServiceImpl implements MapPinnedService {

	@Autowired
	private MapPinnedDao mapPinnedDao;
	
	@Override
	public MapPinned getMapById(int id) {
		return mapPinnedDao.getMapById(id);
	}

	@Override
	public MapPinned createMap(String name, String description, int authorId, float initLatitude, float initLongitude, int zoom) {
		return mapPinnedDao.createMap(name, description, authorId, initLatitude, initLongitude, zoom);
	}

	@Override
	public MapPinned replaceMap(int origin, int newMap) {
		return mapPinnedDao.replaceMaps(origin, newMap);
	}
	
	@Override
	public List<MapPinned> getMaps() {
		return mapPinnedDao.getMaps();
	}
	
	@Override
	public List<MapPinned> getMapsByName(String name) {
		return mapPinnedDao.getMapsByName(name);
	}

}
