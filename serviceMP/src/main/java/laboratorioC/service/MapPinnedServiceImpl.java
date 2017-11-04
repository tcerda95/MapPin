package laboratorioC.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import laboratorioC.model.MapPinned;
import laboratorioC.persistence.MapPinnedDao;

@Service
public class MapPinnedServiceImpl implements MapPinnedService {

	@Autowired
	private MapPinnedDao mapPinnedDao;
	
	@Override
	public MapPinned getMapById(int id) {
		return mapPinnedDao.getMapById(id);
	}

	@Override
	public MapPinned createMap(String name, String description, int authorId) {
		return mapPinnedDao.createMap(name, description, authorId);
	}

}
