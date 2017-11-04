package laboratorioC.model;

public enum PinCategory {
	ART,
	ECONOMY,
	POLITICS,
	RELIGION,
	NATURE,
	SCIENCE,
	SOCIETY,
	WAR;
	
	public String toString() {
		return name().toLowerCase();
	}
}
