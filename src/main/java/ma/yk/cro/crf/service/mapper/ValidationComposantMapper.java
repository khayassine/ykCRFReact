package ma.yk.cro.crf.service.mapper;

import ma.yk.cro.crf.domain.*;
import ma.yk.cro.crf.service.dto.ValidationComposantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ValidationComposant and its DTO ValidationComposantDTO.
 */
@Mapper(componentModel = "spring", uses = {ComposantTemplateMapper.class, RegleValidationMapper.class})
public interface ValidationComposantMapper extends EntityMapper<ValidationComposantDTO, ValidationComposant> {

    @Mapping(source = "composantTemplate.id", target = "composantTemplateId")
    @Mapping(source = "regleValidation.id", target = "regleValidationId")
    ValidationComposantDTO toDto(ValidationComposant validationComposant);

    @Mapping(source = "composantTemplateId", target = "composantTemplate")
    @Mapping(source = "regleValidationId", target = "regleValidation")
    ValidationComposant toEntity(ValidationComposantDTO validationComposantDTO);

    default ValidationComposant fromId(Long id) {
        if (id == null) {
            return null;
        }
        ValidationComposant validationComposant = new ValidationComposant();
        validationComposant.setId(id);
        return validationComposant;
    }
}
