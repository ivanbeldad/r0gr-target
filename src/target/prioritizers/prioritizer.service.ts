import { Injectable } from '@nestjs/common';
import { Protocol } from 'src/target/models/protocol.enum';
import { PrioritizerDefinition } from 'src/target/prioritizers/prioritizer-definition';

@Injectable()
export class PrioritizerService {
  constructor(private priorizerDefinition: PrioritizerDefinition) {}

  public getComposedPrioritizer(protocols: Protocol[]) {
    let prioritizer = this.priorizerDefinition.basePrioritizer;
    const defaultPrioritizers = this.priorizerDefinition.defaultPrioritizers;
    const protocolPrioritizers = protocols.map(
      (protocol) => this.priorizerDefinition.protocolPrioritizers[protocol],
    );
    const PrioritizerDefs = [...defaultPrioritizers, ...protocolPrioritizers];
    PrioritizerDefs.forEach((PrioritizerDec) => (prioritizer = new PrioritizerDec(prioritizer)));
    return prioritizer;
  }
}
