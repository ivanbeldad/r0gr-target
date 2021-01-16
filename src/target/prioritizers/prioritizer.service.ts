import { Injectable } from '@nestjs/common';
import { Protocol } from 'src/target/models/protocol.enum';
import { PrioritizerDefinition } from 'src/target/prioritizers/prioritizer-definition';

@Injectable()
export class PrioritizerService {
  constructor(private priorizerDefinition: PrioritizerDefinition) {}

  public getComposedPrioritizer(protocols: Protocol[]) {
    const prioritizerDefs = this.prioritizerDefs(protocols);

    let prioritizer = this.priorizerDefinition.basePrioritizer;

    prioritizerDefs.forEach(({ DecoratorClass, weight }) => {
      const decorator = new DecoratorClass(prioritizer);
      if (weight) decorator.weight = weight;
      prioritizer = decorator;
    });

    return prioritizer;
  }

  private prioritizerDefs(protocols: Protocol[]) {
    return [
      ...this.priorizerDefinition.defaultPrioritizers,
      ...this.protocolPrioritizers(protocols),
    ];
  }

  private protocolPrioritizers(protocols: Protocol[]) {
    return protocols.map((protocol) => this.priorizerDefinition.protocolPrioritizers[protocol]);
  }
}
