import { LocationStrategy, Material, MaterialItem, PositiveSequenceStrategy } from '@gamepark/rules-api'

export class StackingStrategy implements LocationStrategy {
  private delegate = new PositiveSequenceStrategy('z')

  addItem(material: Material, item: MaterialItem) {
    this.delegate.addItem(
      material.location((l) => l.x === item.location.x && l.y === item.location.y),
      item
    )
  }

  moveItem(material: Material, item: MaterialItem, index: number) {
    const itemBefore = material.getItem(index)
    if (itemBefore.location.x === item.location.x && itemBefore.location.y === itemBefore.location.y) {
      this.delegate.moveItem(material, item, index)
    } else {
      this.delegate.removeItem(
        material
          .index((i) => i !== index)
          .location((l) => l.x === itemBefore.location.x && l.y === itemBefore.location.y),
        itemBefore
      )
      this.delegate.addItem(
        material.location((l) => l.x === item.location.x && l.y === item.location.y),
        item
      )
    }
  }

  removeItem(material: Material, item: MaterialItem) {
    this.delegate.removeItem(
      material.location((l) => l.x === item.location.x && l.y === item.location.y),
      item
    )
  }
}
