# The panel stops only processes of projects listed in its config

The panel sees and stops only the dev processes of projects whose folders the owner listed in the config, never an arbitrary system process. A button that can stop any process on the machine is dangerous, and the owner would not notice a mistake until something important dies. The cost: a project must be listed before the panel can see it.
