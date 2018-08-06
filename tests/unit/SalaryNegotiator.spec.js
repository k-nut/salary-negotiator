import { mount } from "@vue/test-utils";
import SalaryNegotiator from "@/components/SalaryNegotiator.vue";

describe("SalaryNegotiator", () => {
  let mockShowMessage;
  let wrapper;

  beforeEach(() => {
    mockShowMessage = jest.fn();
    wrapper = mount(SalaryNegotiator, {
      methods: { showMessage: mockShowMessage }
    });
  });

  it("follows flow properly", () => {
    const employerInput = wrapper.find("input");
    employerInput.element.value = 300;
    employerInput.trigger("input");
    expect(wrapper.vm.employerValue).toBe(300);

    const form = wrapper.find("form");
    form.trigger("submit");
    expect(wrapper.vm.activeTab).toBe("employee");

    const employeeInput = wrapper.find("input");
    employeeInput.element.value = 100;
    employeeInput.trigger("input");
    expect(wrapper.vm.employeeValue).toBe(100);

    form.trigger("submit");

    expect(mockShowMessage.mock.calls.length).toBe(1);
    expect(mockShowMessage.mock.calls[0][0]).toBe(true);
  });

  it("shows negative message if employee asks for more then employer is giving", () => {
    wrapper.setData({ employeeValue: 100, employerValue: 10 });
    const mockEvent = new Event("submit");
    wrapper.vm.compare(mockEvent);

    expect(mockShowMessage.mock.calls.length).toBe(1);
    expect(mockShowMessage.mock.calls[0][0]).toBe(false);
  });

  it("shows positive message if employee asks for less then employer is giving", () => {
    wrapper.setData({ employeeValue: 100, employerValue: 1000 });
    const mockEvent = new Event("submit");
    wrapper.vm.compare(mockEvent);

    expect(mockShowMessage.mock.calls.length).toBe(1);
    expect(mockShowMessage.mock.calls[0][0]).toBe(true);
  });

  it("shows positive message if values are equal", () => {
    wrapper.setData({ employeeValue: 100, employerValue: 100 });
    const mockEvent = new Event("submit");
    wrapper.vm.compare(mockEvent);

    expect(mockShowMessage.mock.calls.length).toBe(1);
    expect(mockShowMessage.mock.calls[0][0]).toBe(true);
  });

  describe("showMessage", () => {
    it("show a success message if true is passed", () => {
      global.alert = jest.fn();
      SalaryNegotiator.methods.showMessage(true);

      expect(global.alert).toBeCalled();
      expect(global.alert.mock.calls[0][0]).toContain("Success!");
    });

    it("show a failure message if false is passed", () => {
      global.alert = jest.fn();
      SalaryNegotiator.methods.showMessage(false);

      expect(global.alert).toBeCalled();
      expect(global.alert.mock.calls[0][0]).toContain("Failure!");
    });
  });
});
