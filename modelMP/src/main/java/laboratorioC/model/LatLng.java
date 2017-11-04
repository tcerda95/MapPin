package laboratorioC.model;

public class LatLng {
	private final double latitude;
	private final double longitude;
	
	public LatLng(final double latitude, final double longitude) {
		if (latitude < -91 || latitude > 91)
			throw new IllegalArgumentException("Invalid latitude " + latitude);
		
		if (longitude < -181 || longitude > 181)
			throw new IllegalArgumentException("Invalid longitude " + longitude);
		
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(latitude);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(longitude);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		
		if (!(obj instanceof LatLng))
			return false;
		
		LatLng other = (LatLng) obj;
		
		if (Double.doubleToLongBits(latitude) != Double.doubleToLongBits(other.latitude))
			return false;
		if (Double.doubleToLongBits(longitude) != Double.doubleToLongBits(other.longitude))
			return false;
		
		return true;
	}
	
	
}
