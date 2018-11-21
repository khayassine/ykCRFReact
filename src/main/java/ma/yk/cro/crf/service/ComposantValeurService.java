package ma.yk.cro.crf.service;

import ma.yk.cro.crf.service.dto.ComposantValeurDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ComposantValeur.
 */
public interface ComposantValeurService {

    /**
     * Save a composantValeur.
     *
     * @param composantValeurDTO the entity to save
     * @return the persisted entity
     */
    ComposantValeurDTO save(ComposantValeurDTO composantValeurDTO);

    /**
     * Get all the composantValeurs.
     *
     * @return the list of entities
     */
    List<ComposantValeurDTO> findAll();


    /**
     * Get the "id" composantValeur.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ComposantValeurDTO> findOne(Long id);

    /**
     * Delete the "id" composantValeur.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
