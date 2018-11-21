package ma.yk.cro.crf.repository;

import ma.yk.cro.crf.domain.ComposantValeur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ComposantValeur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComposantValeurRepository extends JpaRepository<ComposantValeur, Long> {

}
