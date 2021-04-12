package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Obrazovanje;
import rva.jpa.Radnik;
import rva.jpa.Sektor;
import rva.repository.ObrazovanjeRepository;
import rva.repository.RadnikRepository;
import rva.repository.SektorRepository;

@CrossOrigin
@RestController
@Api(tags = {"Radnik CRUD operacije"})
public class RadnikRestController {

	@Autowired
	private RadnikRepository radnikRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private SektorRepository sektorRepository;
	
	@Autowired
	private ObrazovanjeRepository obrazovanjeRepository;
	
	@GetMapping("radnik")
	@ApiOperation(value="Vraca kolekciju svih radnika iz baze podataka")
	public Collection<Radnik> getRadnici() {
		return radnikRepository.findAll();
	}
	
	@GetMapping("radnik/{id}")
	@ApiOperation(value="Vraca radnika na osnovu prosledjenog ID-ija")
	public Radnik getRadnik(@PathVariable("id") Integer id) {
		return radnikRepository.getOne(id);
	}
	
	@GetMapping("radnikSektor/{id}")
	@ApiOperation(value="Vraca kolekciju radnika na osnovu prosledjenjog ID-ija sektora")
	public Collection<Radnik> getRadnikBySektor(@PathVariable("id") Integer id) {
		Sektor s = sektorRepository.getOne(id);
		return radnikRepository.findBySektor(s);
	}
	
	@GetMapping("radnikObrazovanje/{id}")
	@ApiOperation(value="Vraca kolekciju radnika na osnovu prosledjenjog ID-ija obrazovanja")
	public Collection<Radnik> getRadnikByObrazovanje(@PathVariable("id") Integer id) {
		Obrazovanje o = obrazovanjeRepository.getOne(id);
		return radnikRepository.findByObrazovanje(o);
	}
	
	@PostMapping("radnik")
	@ApiOperation(value="Dodaje novog radnika u bazu podataka")
	public ResponseEntity<Radnik> insertRadnik(@RequestBody Radnik radnik ) {
		if(!radnikRepository.existsById(radnik.getId())) {
			radnikRepository.save(radnik);
			return new ResponseEntity<Radnik>(HttpStatus.OK);
		}
		return new ResponseEntity<Radnik>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("radnik")
	@ApiOperation(value="Update-uje radnika iz baze podataka")
	public ResponseEntity<Radnik> updateRadnik(@RequestBody Radnik radnik) {
		if(!radnikRepository.existsById(radnik.getId())) {
			return new ResponseEntity<Radnik>(HttpStatus.NO_CONTENT);
		}
		radnikRepository.save(radnik);
		return new ResponseEntity<Radnik>(HttpStatus.OK);
	}
	
	@DeleteMapping("radnik/{id}")
	@ApiOperation(value="Brise radnika iz baze podataka (na osnovu prosledjene ID vrednosti)")
	public ResponseEntity<Radnik> deleteRadnik(@PathVariable("id") Integer id ) {
		if(!radnikRepository.existsById(id)) {
			return new ResponseEntity<Radnik>(HttpStatus.NO_CONTENT);
		}
		radnikRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute(" INSERT INTO \"radnik\" (\"id\", \"broj_lk\", \"ime\", \"prezime\", \"obrazovanje\", \"sektor\")"
					+ "Values (-100, 100, 'test', 'testic', '1','1')");
		}
		return new ResponseEntity<Radnik>(HttpStatus.OK);
	}
}
