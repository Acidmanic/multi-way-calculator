

module.name:string
module.parameters[]:Parameter[] ->  Parameter.Name:string
                                    Parameter.Units[]:Unit[] -> Unit.Name
                                                               Unit.CoEfficient
module.calculate({label:{value:number,unit:Unit},...}) -> {supported:bool,result:{value:number,unit:Unit}}