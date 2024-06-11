import React, { ComponentType } from 'react'

export default function asyncComponent<T extends object>(
  getComponent: () => Promise<{ default: ComponentType<T> }>
) {
  return class AsyncComponent extends React.Component<
    T,
    { Component: ComponentType<T> | null }
  > {
    public static Component: ComponentType<T> | null = null
    public state = { Component: AsyncComponent.Component }

    public async componentDidMount() {
      if (!this.state.Component) {
        const { default: Component } = await getComponent()
        AsyncComponent.Component = Component
        this.setState({ Component })
      }
    }

    public render() {
      const { Component } = this.state
      return Component ? <Component {...this.props} /> : null
    }
  }
}
