import { Injectable } from '@nestjs/common';
import { Protocol } from 'src/target/models/protocol.enum';
import { BasePrioritizer } from 'src/target/prioritizers/strategies/base-prioritizer';
import { Prioritizable } from 'src/target/prioritizers/models/prioritizable.interface';
import { PriorityDecorator } from 'src/target/prioritizers/models/priority-decorator';
import { AvoidMechPrioritizerDecorator } from 'src/target/prioritizers/strategies/enemy-types/avoid-mech-prioritizer.decorator';
import { PreferMechPrioritizerDecorator } from 'src/target/prioritizers/strategies/enemy-types/prefer-mech-prioritizer.decorator';
import { ClosestEnemiesPrioritizerDecorator } from 'src/target/prioritizers/strategies/distance/closest-enemies-prioritizer.decorator';
import { FurthestEnemiesPrioritizerDecorator } from 'src/target/prioritizers/strategies/distance/furthest-enemies-prioritizer.decorator';
import { AssistAlliesPrioritizerDecorator } from 'src/target/prioritizers/strategies/allies/assist-allies-prioritizer.decorator';
import { AvoidCrossfirePrioritizerDecorator } from 'src/target/prioritizers/strategies/allies/avoid-crossfire-prioritizer.decorator';
import { OutOfRangePrioritizerDecorator } from 'src/target/prioritizers/strategies/distance/out-of-range-prioritizer.decorator';

type PriorityDecoratorClass = new (p: Prioritizable) => PriorityDecorator;
type ProtocolPrioritizer = { [key in Protocol]: PriorityDecoratorClass };

@Injectable()
export class PrioritizerDefinition {
  /**
   * Define initial values
   */
  readonly basePrioritizer: Prioritizable = new BasePrioritizer();

  /**
   * Define rules that will be applied everywhere, doesn't matter the protocol
   */
  readonly defaultPrioritizers: PriorityDecoratorClass[] = [OutOfRangePrioritizerDecorator];

  /**
   * Define rules that will apply depending on protocol
   * Protocols without implementation have to be declared explicitly using PassthroughPrioritizerDecorator
   *
   * @example
   * { [Protocol.PROTOCOL_TO_IMPLEMENT]: DecoratorImplementationClass }
   */
  readonly protocolPrioritizers: ProtocolPrioritizer = {
    [Protocol.AVOID_MECH]: AvoidMechPrioritizerDecorator,
    [Protocol.PRIORITIZE_MECH]: PreferMechPrioritizerDecorator,
    [Protocol.CLOSEST_ENEMIES]: ClosestEnemiesPrioritizerDecorator,
    [Protocol.FURTHEST_ENEMIES]: FurthestEnemiesPrioritizerDecorator,
    [Protocol.ASSIST_ALLIES]: AssistAlliesPrioritizerDecorator,
    [Protocol.AVOID_CROSSFIRE]: AvoidCrossfirePrioritizerDecorator,
  };
}
