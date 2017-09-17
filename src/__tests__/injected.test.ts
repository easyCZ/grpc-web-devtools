import { WebToolsDebugger, WebToolsDebuggerProvider } from '../injected';

describe('WebToolsDebugger', () => {

  const REQUEST_ID = 123;

  it('should exist', () => {
    expect(WebToolsDebugger).toBeDefined();
  });

  it('should be able to create a new instance', () => {
    const instance = new WebToolsDebugger(REQUEST_ID);
    expect(instance).toBeDefined();
  });

});

describe('WebToolsDebuggerProvider', () => {

  const REQUEST_ID = 123;
  const provider = new WebToolsDebuggerProvider();

  it('should exist', () => {
    expect(WebToolsDebuggerProvider).toBeDefined();
  });

  it('should be a constructor', () => {
    expect(provider).toBeDefined();
  });

  it('should have a method to get an instance of debugger', () => {
    expect(provider.getInstanceForRequest).toBeDefined();
    expect(provider.getInstanceForRequest(REQUEST_ID)).toBeInstanceOf(WebToolsDebugger);
  });

});
